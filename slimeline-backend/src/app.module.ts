import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';
import { ContactsModule } from './contacts/contacts.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { UploadModule } from './upload/upload.module';
import { EmailModule } from './email/email.module';
import { TestimonialsModule } from './testimonials/testimonials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    PackagesModule,
    ContactsModule,
    EnquiriesModule,
    UploadModule,
    EmailModule,
    TestimonialsModule,
  ],
})
export class AppModule {}

