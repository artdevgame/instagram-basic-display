interface InstagramAccessToken {
  access_token: string;
}

declare class InstagramBasicDisplayApi {
  /**
   * Create a new instance of instagram basic display api class
   * @param config
   * @param config.appId
   * @param config.redirectUri
   * @param config.appSecret
   */
  constructor(config: object);

  /**
   * The URL on which users can log in with instagram
   * @returns Authorization URL
   */
  authorizationUrl: string;
  /**
   * Refreshes an unexpired long-life access token
   * @param accessToken a user's long-life access token
   */
  refreshLongLivedToken(accessToken: string): Promise<InstagramAccessToken>;
  /**
   * Retrieves an access token (ttl: 1h)
   * @param userCode can be found in querystring of redirect URI after authorization
   * @returns request
   */
  retrieveToken(userCode: string): Promise<InstagramAccessToken>;
  /**
   * Retrieves an longer living access token (ttl: 60d)
   * @param accessToken user's access token
   * @returns request
   */
  retrieveLongLivedToken(accessToken: string): Promise<InstagramAccessToken>;
  /**
   * Retrieves information about the user
   * @param accessToken user's access token
   * @param fields available fields: `id,username,account_type,media_count,media` (see https://developers.facebook.com/docs/instagram-basic-display-api/reference/user#fields for reference)
   * @returns request
   */
  retrieveUserNode(accessToken: string, fields: string): Promise<object>;
  /**
   * Retrieves user media
   * @param accessToken user's access token
   * @param fields available fields: `caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username` (see https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields for reference)
   * @returns request
   */
  retrieveUserMedia(
    accessToken: string,
    limit: number,
    fields: string
  ): Promise<object>;
  /**
   * Retrieves media data
   * @param accessToken user's access token
   * @param mediaId the media id
   * @param fields available fields: `caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username` (see https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields for reference)
   * @returns request
   */
  retrieveMediaData(
    accessToken: string,
    mediaId: string | number,
    fields: string
  ): Promise<object>;
}

export default InstagramBasicDisplayApi;
