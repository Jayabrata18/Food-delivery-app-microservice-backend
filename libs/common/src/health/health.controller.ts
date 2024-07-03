import { NatsClientModule } from '@app/common';
import {
    Controller,
    Get,
    Inject,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    MicroserviceHealthIndicator,
    MicroserviceHealthIndicatorOptions,
} from '@nestjs/terminus';

@Injectable()
@Controller('health')
export class HealthController {
    readonly heapUsedThreshold: number;
    readonly rssThreshold: number;
    readonly diskStorageThreshold: number;
    readonly microserviceOptions: MicroserviceHealthIndicatorOptions;

    constructor(
        @Inject(ConfigService)
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private readonly microservice: MicroserviceHealthIndicator,
        private readonly configService: ConfigService,
    ) {
        this.heapUsedThreshold = this.configService.get<number>('HEAP_USED_THRESHOLD');
        this.rssThreshold = this.configService.get<number>('RSS_THRESHOLD');
        this.diskStorageThreshold = this.configService.get<number>('DISK_STORAGE_THRESHOLD');
        this.microserviceOptions = {
            transport: NatsClientModule,
            options: {
                url: this.configService.get<string>('NATS_URI'),
            },
            timeout: this.configService.get<number>('NATS_TIMEOUT'),
        };

    }

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        return this.health.check([
            async () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
            async () => this.memory.checkHeap('memory_heap', this.heapUsedThreshold),
            async () => this.memory.checkRSS('memory_rss', this.rssThreshold),
            async () => this.disk.checkStorage('disk', this.diskStorageThreshold),
            async () => this.microservice.pingCheck('microservice', this.microserviceOptions),
        ]);

    }


}
