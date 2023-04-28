export class PasswordValidationConfig {
  static key = "password";
  static displayKey = "패스워드";

  static options = {
    validLength: {
      min: 8,
      max: 16,
    },
  };

  static args = {
    required: [this.key, `${this.displayKey}는 필수 파라미터입니다.`],
    validLength: [
      this.key,
      `${this.displayKey}는 ${this.options.validLength.min}자이상 ${this.options.validLength.max}자 이하이여야 합니다`,
    ],
  };
}
