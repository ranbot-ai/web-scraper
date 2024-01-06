export interface IConfig {
  name: string;
  user_agent: string;
  headless: boolean;
  devtools: boolean;
  timeout: number;
  max_tries: number;
  protocols: string[];
}

export interface IIdentifier {
  id: number;
  identifier: string;
}

export interface IQueueItem {
  tries: number;
  identifier: Identifier;
}
