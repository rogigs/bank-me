import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import * as csvParser from 'csv-parser';
import { Request, Response } from 'express';
import { Readable } from 'stream';
import validator from 'validator';
import { AuthGuard } from '../auth/auth.guard';
import { AbstractCrudController } from '../crud/crud.controller';
import {
  PayableNoBaseModel,
  PayableNoBaseModelDTO,
} from './DTO/payable-no-base-model.DTO';
import { PayableService } from './payable.service';
@ApiTags('Payable')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ path: 'integrations/payable', version: '1' })
export class PayableController extends AbstractCrudController<
  Payable,
  PayableNoBaseModel
> {
  constructor(public readonly payableService: PayableService) {
    super(payableService);
  }

  // TODO: AbstractCrudController should receive PayableNoBaseModelDTO
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: PayableNoBaseModelDTO,
  })
  @Post()
  async create(@Body() createDTO: PayableNoBaseModel): Promise<void> {
    await this.payableService.create(createDTO);
  }

  // Revert that just to test what is faster to validated a CSV
  @Post('/batch')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (file.mimetype === 'text/csv') {
          callback(null, true);
        } else {
          callback(new Error('Only CSV files are allowed'), false);
        }
      },
    }),
  )
  async createMany(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    console.time('Processing Time');
    if (!file) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send('No file uploaded or incorrect file type');
      return;
    }

    const fileStream = Readable.from(file.buffer.toString());
    let rowCount = 1;
    const errors = [];

    fileStream
      .pipe(csvParser())
      .on('data', (row) => {
        rowCount++;
        const keys = Object.keys(row);
        const [value, assignorEmail, emissionDate] = keys;

        if (keys.length > 3) {
          errors.push(`Linha ${rowCount}: Há colunas que não são aceitas`);
          return;
        }

        if (!validator.isNumeric(row[value])) {
          errors.push(
            `Linha ${rowCount}: Erro na coluna ${value} por não ser um número válido: ${row[value]}`,
          );
        }

        if (!validator.isEmail(row[assignorEmail])) {
          errors.push(
            `Linha ${rowCount}: Erro na coluna ${assignorEmail} por não ser um email válido: ${row[assignorEmail]}`,
          );
        }

        if (!validator.isDate(row[emissionDate])) {
          errors.push(
            `Linha ${rowCount}: Erro na coluna ${emissionDate} por não ser uma data válida: ${row[emissionDate]}`,
          );
        }
      })
      .on('end', () => {
        if (errors.length > 0) {
          console.timeEnd('Processing Time');
          res.status(HttpStatus.BAD_REQUEST).json({ errors });
        } else {
          console.log('CSV is valid, processing data...');
          res.status(HttpStatus.OK).send('File processed successfully');
        }
        fileStream.destroy();
      })
      .on('error', (error) => {
        console.error('Error processing file:', error);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error processing file');
        fileStream.destroy();
      });
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string | { errors: string[] }> {
    console.time('Processing Time');
    if (!file) {
      throw new Error('Arquivo não encontrado');
    }

    const chunkSize = 100; // Tamanho do chunk
    const chunks = [];
    const stream = Readable.from(file.buffer).pipe(csvParser());

    let currentChunk = [];
    let rowCount = 0;

    for await (const row of stream) {
      currentChunk.push(row);
      rowCount++;

      if (rowCount >= chunkSize) {
        chunks.push(currentChunk);
        currentChunk = [];
        rowCount = 0;
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk);
    }

    const errors: string[] = [];

    for (const [index, chunk] of chunks.entries()) {
      console.log(`Processando chunk ${index + 1}`);
      const chunkErrors = await this.validateChunk(chunk, index + 1);
      errors.push(...chunkErrors);
    }

    console.timeEnd('Processing Time');
    if (errors.length > 0) {
      return { errors };
    }

    return 'Arquivo processado com sucesso';
  }

  async validateChunk(chunk: any[], chunkNumber: number): Promise<string[]> {
    const errors: string[] = [];

    for (const [rowIndex, row] of chunk.entries()) {
      const rowCount = rowIndex + 1 + (chunkNumber - 1) * 100;
      const keys = Object.keys(row);
      const [value, assignorEmail, emissionDate] = keys;

      if (keys.length > 3) {
        errors.push(`Linha ${rowCount}: Há colunas que não são aceitas`);
        continue;
      }

      if (!validator.isNumeric(row[value])) {
        errors.push(
          `Linha ${rowCount}: Erro na coluna ${value} por não ser um número válido: ${row[value]}`,
        );
      }

      if (!validator.isEmail(row[assignorEmail])) {
        errors.push(
          `Linha ${rowCount}: Erro na coluna ${assignorEmail} por não ser um email válido: ${row[assignorEmail]}`,
        );
      }

      if (!validator.isDate(row[emissionDate])) {
        errors.push(
          `Linha ${rowCount}: Erro na coluna ${emissionDate} por não ser uma data válida: ${row[emissionDate]}`,
        );
      }
    }

    return errors;
  }
}
