import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from '@tamagui/core'

const appConfig = createTamagui(defaultConfig)

export type Conf = typeof appConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default appConfig
