class InstanceOptions {
  public apiKey?: String;
  public callbackUrl?: String;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.apiKey = data.apiKey || process.env.PDF4DEV_API_KEY;

    if (!this.apiKey) {
      throw new Error("You must specified an API Key.");
    }
  }

  public getHeaders(): Object {
    let headers = {
      authorization: this.apiKey,
    };

    if (this.callbackUrl) {
      headers["X-Callback-Url"] = this.callbackUrl;
    }

    return headers;
  }
}

export default InstanceOptions;
