export default class UrlHelper {

  static createUrl(params): string {
      return params.join('/');
  }
}
