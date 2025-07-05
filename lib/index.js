import querystring from "querystring";

const INSTAGRAM_OAUTH_BASE_URL = "https://api.instagram.com/oauth";
const INSTAGRAM_GRAPH_BASE_URL = "https://graph.instagram.com";

class InstagramBasicDisplayApi {
  constructor(config) {
    this._appId = config.appId;
    this._redirectUri = config.redirectUri;
    this._appSecret = config.appSecret;

    this._authorizationUrl = `${INSTAGRAM_OAUTH_BASE_URL}/authorize?${querystring.stringify(
      {
        client_id: this._appId,
        redirect_uri: this._redirectUri,
        scope: "user_profile,user_media",
        response_type: "code",
      }
    )}`;
  }

  get authorizationUrl() {
    return this._authorizationUrl;
  }

  async refreshLongLivedToken(accessToken) {
    const requestData = {
      grant_type: "ig_refresh_token",
      access_token: accessToken,
    };

    const res = await fetch(
      `${INSTAGRAM_GRAPH_BASE_URL}/refresh_access_token?${querystring.stringify(
        requestData
      )}`
    );
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    return res.json();
  }

  async retrieveToken(userCode) {
    const requestData = {
      client_id: this._appId,
      client_secret: this._appSecret,
      grant_type: "authorization_code",
      redirect_uri: this._redirectUri,
      code: userCode,
    };
    const res = await fetch(`${INSTAGRAM_OAUTH_BASE_URL}/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: querystring.stringify(requestData),
    });
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    return res.json();
  }

  async retrieveLongLivedToken(accessToken) {
    const requestData = {
      grant_type: "ig_exchange_token",
      client_secret: this._appSecret,
      access_token: accessToken,
    };

    const res = await fetch(
      `${INSTAGRAM_GRAPH_BASE_URL}/access_token?${querystring.stringify(
        requestData
      )}`
    );
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    return res.json();
  }

  async retrieveUserNode(
    accessToken,
    fields = "id,username,account_type,media_count,media"
  ) {
    const requestData = {
      fields,
      access_token: accessToken,
    };

    const res = await fetch(
      `${INSTAGRAM_GRAPH_BASE_URL}/me?${querystring.stringify(requestData)}`
    );
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    return res.json();
  }

  async retrieveUserMedia(
    accessToken,
    limit = 20,
    fields = "caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username"
  ) {
    const requestData = {
      fields,
      limit,
      access_token: accessToken,
    };

    const res = await fetch(
      `${INSTAGRAM_GRAPH_BASE_URL}/me/media?${querystring.stringify(
        requestData
      )}`
    );
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    return res.json();
  }

  async retrieveMediaData(
    accessToken,
    mediaId,
    fields = "caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username"
  ) {
    const requestData = {
      fields,
      access_token: accessToken,
    };

    const res = await fetch(
      `${INSTAGRAM_GRAPH_BASE_URL}/${mediaId}?${querystring.stringify(
        requestData
      )}`
    );
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    return res.json();
  }
}

export default InstagramBasicDisplayApi;
