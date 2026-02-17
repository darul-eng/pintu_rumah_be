import { Global, Module } from '@nestjs/common';
import { SvgParserService } from './services/svg-parser.service';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class CommonModule {}
