export class EmailValidationConfig {
  static key = "email";
  static displayKey = "이메일";

  static args = {
    required: [this.key, `${this.displayKey}은 필수 파라미터입니다.`],
    validFormat: [this.key, `유효한 ${this.displayKey} 형식이 아닙니다.`],
  };
}
