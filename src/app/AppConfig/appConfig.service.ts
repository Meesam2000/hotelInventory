import { InjectionToken } from "@angular/core"
import { AppConfig } from "./appConfig.interface"
import { environment } from "environments/environment"

export const appServiceConfig = new InjectionToken<AppConfig>('app.config')

export const appConfig : AppConfig = {
    apiEndpoint : environment.apiEndpoint
}