package com.dvaji.simplecrud.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class ControllerExceptionHandler {
  private static final Logger logger = LoggerFactory.getLogger(ControllerExceptionHandler.class);

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(value = HttpStatus.NOT_FOUND)
  public ErrorMessage resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND.name(), ex.getMessage());

    return message;
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
  public ErrorMessage accessDeniedExceptionHandler(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) {
    ErrorMessage message = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.name(),
        "No tienes acceso a este contenido.");
    return message;
  }

  @ExceptionHandler(BadCredentialsException.class)
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  public ErrorMessage badCredentialsExceptionHandler(Exception ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.name(),
        "La contraseña y/o Correo electrónico que ingresaste es incorrecta.");
    return message;
  }

  @ExceptionHandler(ExpiredJwtException.class)
  @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
  public ErrorMessage expiredJwtExceptionHandler(Exception ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage("EXPIRED_SESSION", "Su sesión ya ha caducado.");
    return message;
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
  public ErrorMessage usernameNotFoundExceptionHandler(Exception ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage("EXPIRED_SESSION", "Su sesión ya ha caducado.");
    return message;
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
  public ErrorMessage constraintViolationExceptionHandler(Exception ex, WebRequest request) {
    ErrorMessage message = new ErrorMessage("VALUE_NOT_VALID", ex.getMessage());
    return message;
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
  public ErrorMessage globalExceptionHandler(Exception ex, WebRequest request) {
    logger.error("Error", ex);
    ErrorMessage message = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.name(),
        "Hubo un error inesperado, intentar nuevamente.");

    return message;
  }
}