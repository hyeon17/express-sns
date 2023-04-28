export class ProfileValidationConfig {
  static key = "profile";
  static displayKey = "프로필 이미지";

  static args = {
    required: [this.key, `${this.displayKey}는 필수 파라미터입니다.`],
    validFormat: [this.key, `유효한 ${this.displayKey} 형식이 아닙니다.`],
  };
}
