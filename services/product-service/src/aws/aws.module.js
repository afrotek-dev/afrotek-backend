"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
let AwsModule = class AwsModule {
};
exports.AwsModule = AwsModule;
exports.AwsModule = AwsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true })],
        providers: [
            {
                provide: 'S3_CLIENT', // ✅ this token name must match the @Inject() in your controller
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const region = config.get('AWS_REGION') || 'af-south-1';
                    const accessKeyId = config.get('AWS_ACCESS_KEY_ID');
                    const secretAccessKey = config.get('AWS_SECRET_ACCESS_KEY');
                    const options = { region };
                    if (accessKeyId && secretAccessKey) {
                        options.credentials = { accessKeyId, secretAccessKey };
                    }
                    return new client_s3_1.S3Client(options);
                },
            },
        ],
        exports: ['S3_CLIENT'], // ✅ export same token
    })
], AwsModule);
//# sourceMappingURL=aws.module.js.map