import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class AvatarUploadConfig implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    const uploadPath = this.configService.getOrThrow('AVATARS_PATH');

    return {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, cb) => {
          const user = req.user as { name: string }; 
          const name = user.name;
          const ext = extname(file.originalname);

          if (!name) {
            return cb(new Error('Пользователь не найден в запросе.'), '');
          }

          cb(null, `${name}${ext}`);
        },
      }),
    };
  }
}