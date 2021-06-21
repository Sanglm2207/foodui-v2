export class AppSettings {

    public static readonly BASE_URL = `http://localhost:2021/api/`;
    public static readonly PAGE_SIZE = 10;
    public static readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50, 100];
    public static readonly DEFAULT_LANGUAGE = 'vi';
    public static readonly DEFAULT_LANGUAGE_ID = '1';
    public static readonly DEFAULT_THEME = 'default';
  
    public static readonly API_DATE_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS';
    public static readonly UPLOAD_FILE_CONTROL = '_upload_files';
    public static readonly DISPLAY_DATE_FORMAT = 'dd/MM/yyyy';
    public static readonly DISPLAY_DATETIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';
    public static readonly FILE_DATETIME_FORMAT = 'yyyyMMddHHmmssSSS';
  }
  