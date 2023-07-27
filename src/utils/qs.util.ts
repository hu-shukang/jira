import qs from 'qs';

class QsUtil {
  public stringify(params: any) {
    params = this.clearParams(params);
    return qs.stringify(params);
  }

  private clearParams(params: any) {
    return Object.fromEntries(
      Object.entries(params).filter(
        ([k, v]) => v !== '' && v !== null && v !== undefined
      )
    );
  }
}

export const qsUtil = new QsUtil();
