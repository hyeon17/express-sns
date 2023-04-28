export class UsernameValidationConfig {
  static key = "username";
  static displayKey = "유저이름";

  static options = {
    validLength: {
      min: 4,
      max: 10,
    },
  };

  static args = {
    required: [this.key, `${this.displayKey}은 필수 파라미터입니다.`],
    validLength: [
      this.key,
      `${this.displayKey}은 ${this.options.validLength.min}자이상 ${this.options.validLength.max}자 이하이여야 합니다`,
    ],
  };
}
