import { ApiError } from "@/error/ApiError";
import { Result, ValidationError } from "express-validator";

export class ApiValidator {
  static validate = {
    signup: this.#signup,
    login: this.#login,
    createPost: this.#createPost,
    getPosts: this.#getPosts,
    getPost: this.#getPost,
    updatePost: this.#updatePost,
    deletePost: this.#deletePost,
    like: this.#like,
    createComment: this.#createComment,
    updateComment: this.#updateComment,
    deleteComment: this.#deleteComment,
  };

  static #signup(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { email, password, username, profile, _unknown_fields } =
        errors.mapped();

      const error = {
        ...(email && { email }),
        ...(password && { password }),
        ...(username && { username }),
        ...(profile && { profile }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }

    return null;
  }

  static #login(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { email, password, _unknown_fields } = errors.mapped();

      const error = {
        ...(email && { email }),
        ...(password && { password }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }

    return null;
  }

  static #createPost(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { content, files, _unknown_fields } = errors.mapped();

      const error = {
        ...(content && { content }),
        ...(files && { files }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }

    return null;
  }

  static #getPosts(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { username, _unknown_fields } = errors.mapped();

      const error = {
        ...(username && { username }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }

    return null;
  }

  static #getPost(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { id, _unknown_fields } = errors.mapped();

      const error = {
        ...(id && { id }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }

    return null;
  }

  static #updatePost(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { content, files, _unknown_fields } = errors.mapped();

      const error = {
        ...(content && { content }),
        ...(files && { files }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }
  }

  static #deletePost(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { id, _unknown_fields } = errors.mapped();

      const error = {
        ...(id && { id }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }
  }

  static #like(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { id, _unknown_fields } = errors.mapped();

      const error = {
        ...(id && { id }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }
  }

  static #createComment(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { postId, content, _unknown_fields } = errors.mapped();

      const error = {
        ...(postId && { postId }),
        ...(content && { content }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }
  }

  static #updateComment(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { id, content, _unknown_fields } = errors.mapped();

      const error = {
        ...(id && { id }),
        ...(content && { content }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }
  }

  static #deleteComment(validationResult: Result<ValidationError>) {
    const errors = validationResult;

    if (!errors.isEmpty()) {
      const { id, _unknown_fields } = errors.mapped();

      const error = {
        ...(id && { id }),
        ...(_unknown_fields && { _unknown_fields }),
      };

      throw new ApiError("InvalidFieldError", error);
    }
  }
}
