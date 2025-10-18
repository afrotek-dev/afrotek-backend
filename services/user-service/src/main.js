"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./user.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(user_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(process.env.PORT || 3003);
}
bootstrap();
//# sourceMappingURL=main.js.map