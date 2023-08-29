import OAuth2Strategy, { StrategyOptions, VerifyFunction } from "passport-oauth2";
export declare const MercadoLivreUrls: {
    authorizationURL: string;
    tokenURL: string;
    apiURL: string;
    profileURL: string;
};
export type MercadoLivreVerifyFunction = VerifyFunction;
export interface MercadoLivreOptions extends Partial<StrategyOptions> {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
}
export declare class MercadoLivreStrategy extends OAuth2Strategy {
    constructor(options: MercadoLivreOptions, verify: VerifyFunction);
    userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): Promise<void>;
}
