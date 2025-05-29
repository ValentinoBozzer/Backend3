class CustomError extends Error {
    constructor(message, statusCode, details = {}) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.details = details;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}

const ErrorTypes = {
    INVALID_CREDENTIALS: {
        message: 'Credenciales inválidas',
        statusCode: 401,
        code: 'AUTH_001'
    },
    USER_NOT_FOUND: {
        message: 'Usuario no encontrado',
        statusCode: 404,
        code: 'USER_001'
    },
    PET_NOT_FOUND: {
        message: 'Mascota no encontrada',
        statusCode: 404,
        code: 'PET_001'
    },
    DUPLICATE_EMAIL: {
        message: 'El email ya está registrado',
        statusCode: 400,
        code: 'USER_002'
    },
    INVALID_PASSWORD: {
        message: 'Contraseña inválida',
        statusCode: 400,
        code: 'AUTH_002'
    },
    UNAUTHORIZED: {
        message: 'No autorizado',
        statusCode: 401,
        code: 'AUTH_003'
    },
    FORBIDDEN: {
        message: 'Acceso denegado',
        statusCode: 403,
        code: 'AUTH_004'
    },
    VALIDATION_ERROR: {
        message: 'Error de validación',
        statusCode: 400,
        code: 'VAL_001'
    }
};

const errorHandler = (error, req, res, next) => {
    const logger = require('./logger');
    
    const errorResponse = {
        success: false,
        error: {
            name: error.name,
            message: error.message,
            timestamp: error.timestamp || new Date().toISOString(),
            path: req.originalUrl,
            method: req.method
        }
    };

    if (error instanceof CustomError) {
        errorResponse.error.code = error.details.code;
        errorResponse.error.details = error.details;
        logger.error('Error personalizado:', errorResponse);
        return res.status(error.statusCode).json(errorResponse);
    }

    // Error de MongoDB
    if (error.name === 'MongoError' || error.name === 'ValidationError') {
        errorResponse.error.code = 'DB_001';
        errorResponse.error.details = { originalError: error.message };
        logger.error('Error de base de datos:', errorResponse);
        return res.status(400).json(errorResponse);
    }

    // Error no manejado
    errorResponse.error.code = 'SYS_001';
    errorResponse.error.details = { stack: process.env.NODE_ENV === 'development' ? error.stack : undefined };
    logger.error('Error no manejado:', errorResponse);
    
    return res.status(500).json(errorResponse);
};

module.exports = {
    CustomError,
    ErrorTypes,
    errorHandler
}; 