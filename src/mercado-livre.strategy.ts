import axios from "axios"
import OAuth2Strategy, {
  StrategyOptions,
  VerifyFunction,
} from "passport-oauth2"

import { MLUser } from "./ml-types-user.interface"

export const MercadoLivreUrls = {
  authorizationURL: "https://auth.mercadolivre.com.br/authorization",
  tokenURL: "https://api.mercadolibre.com/oauth/token",
  apiURL: 'https://api.mercadolibre.com/',
  profileURL: '/users/me',
}

export type MercadoLivreVerifyFunction = VerifyFunction

export interface MercadoLivreOptions extends Partial<StrategyOptions> {
  clientID: string
  clientSecret: string
  callbackURL: string
}

export class MercadoLivreStrategy extends OAuth2Strategy {
  constructor(options: MercadoLivreOptions, verify: VerifyFunction) {
    super(
      {
        ...options,
        ...MercadoLivreUrls,
      },
      verify
    )

    this.name = "mercadolivre"

    this._oauth2.useAuthorizationHeaderforGET(true)
  }

  async userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: any) => void
  ): Promise<void> {
    try {
      const axiosClient = axios.create({
        baseURL: MercadoLivreUrls.apiURL,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      const { data: user } = await axiosClient.get<MLUser>(MercadoLivreUrls.profileURL)
      done(null, user)
    } catch (error) {
      console.error(error.message)
      done(error)
    }
  }
}
