import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

interface ErrorObject<T> {
  errorCode: T;
  message: string;
  status: HttpStatus;
}

const dynamicRecord = <T extends { [key in keyof T]: ErrorObject<key> }>(
  errorObject: T,
): T & Record<string, ErrorObject<keyof T>> => errorObject;

export const isErrorObject = (object: object): object is ErrorObject<string> => {
  return typeof object === 'object' && object !== null && 'errorCode' in object && 'message' in object;
};

export const ERROR_CODE = dynamicRecord({
  /**
   * 공통
   */
  INVALID_DATA: { errorCode: 'INVALID_DATA', message: '입력값이 올바르지 않습니다.', status: HttpStatus.BAD_REQUEST },
  INTERNAL_SERVER_ERROR: {
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: '서버에 오류가 발생했습니다.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },

  /**
   * 유저
   */
  // 유저 공통오류
  USER_ALREADY_EXISTS: {
    errorCode: 'USER_ALREADY_EXISTS',
    message: '이미 가입된 고객입니다.',
    status: HttpStatus.BAD_REQUEST,
  },
  USER_NOT_FOUND: {
    errorCode: 'USER_NOT_FOUND',
    message: '존재하지 않는 고객입니다.',
    status: HttpStatus.NOT_FOUND,
  },
  // 회원정보 변경
  USER_NICKNAME_ALREADY_EXISTS: {
    errorCode: 'USER_NICKNAME_ALREADY_EXISTS',
    message: '이미 사용중인 닉네임입니다.',
    status: HttpStatus.BAD_REQUEST,
  },
  // 유저 가입완료 처리
  USER_NOT_COMPLETED_SIGN_UP: {
    errorCode: 'USER_NOT_COMPLETED_SIGN_UP',
    message: '필수데이터가 누락되어 가입이 불가능합니다.',
    status: HttpStatus.BAD_REQUEST,
  },

  /**
   * 인증
   */
  VERIFICATION_NOT_FOUND: {
    errorCode: 'VERIFICATION_NOT_FOUND',
    message: '존재하지 않는 인증정보입니다.',
    status: HttpStatus.NOT_FOUND,
  },
  VERIFICATION_EXCEED_MAXIMUM_COUNT: {
    errorCode: 'VERIFICATION_EXCEED_MAXIMUM_COUNT',
    message: '인증시도 횟수를 초과했습니다.',
    status: HttpStatus.BAD_REQUEST,
  },
  VERIFICATION_EXPIRED: {
    errorCode: 'VERIFICATION_EXPIRED',
    message: '인증시간이 만료되었습니다.',
    status: HttpStatus.BAD_REQUEST,
  },

  /**
   * 약관
   */
  TERMS_OF_SERVICE_NOT_FOUND: {
    errorCode: 'TERMS_OF_SERVICE_NOT_FOUND',
    message: '존재하지 않는 약관입니다.',
    status: HttpStatus.NOT_FOUND,
  },
});

// 스웨거 Exception Description을 위한 데코레이터
export const GenerateSwaggerDocumentByErrorCode = (errorList: ErrorObject<string>[]) => {
  const badRequest = errorList
    .filter((error) => error.status === HttpStatus.BAD_REQUEST)
    .map((error) => `${error.errorCode}: ${error.message}`)
    .join('</br>');
  const notFound = errorList
    .filter((error) => error.status === HttpStatus.NOT_FOUND)
    .map((error) => `${error.errorCode}: ${error.message}`)
    .join('</br>');
  const internalServerError = errorList
    .filter((error) => error.status === HttpStatus.INTERNAL_SERVER_ERROR)
    .map((error) => `${error.errorCode}: ${error.message}`)
    .join('</br>');

  return applyDecorators(
    ApiBadRequestResponse({ description: badRequest }),
    ApiNotFoundResponse({ description: notFound }),
    ApiInternalServerErrorResponse({ description: internalServerError }),
  );
};
