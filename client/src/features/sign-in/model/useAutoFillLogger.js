// useAutofillLogger.js

import {useEffect} from 'react';

const useAutofillLogger = () => {
    useEffect(() => {
        // Логирование базовой информации об устройстве
        console.log('[AUTOFILL LOGGER] Initialization:', {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
            isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
            touchSupport: 'ontouchstart' in window
        });

        // Перехват всех ошибок
        const handleError = (event) => {
            const isAutofillError =
                event.message === 'Script error.' ||
                event.message?.includes('autoFill') ||
                event.filename?.includes('bundle.js') ||
                event.error?.stack?.includes('autoFill') ||
                event.error?.stack?.includes('_asynchronouslyAutoFillControls');

            if (isAutofillError) {
                analyzeScriptError(event);
            }
        };

        // Перехват ошибок в промисах
        const handleUnhandledRejection = (event) => {
            const reason = event.reason;
            const isAutofillError =
                reason?.message?.includes('autoFill') ||
                reason?.stack?.includes('autoFill') ||
                reason?.stack?.includes('_asynchronouslyAutoFillControls');

            if (isAutofillError) {
                console.log('[AUTOFILL PROMISE ERROR]:', {
                    reason: reason?.toString(),
                    stack: reason?.stack,
                    timestamp: new Date().toISOString(),
                    type: 'unhandledrejection'
                });
                event.preventDefault();
            }
        };

        // Перехват console.error
        const originalConsoleError = console.error;
        console.error = function (...args) {
            const errorMessage = args.join(' ');
            const isAutofillError =
                errorMessage.includes('autoFill') ||
                errorMessage.includes('Script error') ||
                errorMessage.includes('_asynchronouslyAutoFillControls') ||
                errorMessage.includes('handleError@');

            if (isAutofillError) {
                console.log('[AUTOFILL CONSOLE ERROR]:', {
                    args,
                    stack: new Error().stack,
                    timestamp: new Date().toISOString(),
                    type: 'console.error'
                });
                return; // Не показываем оригинальную ошибку
            }

            originalConsoleError.apply(console, args);
        };

        // Мониторинг DOM событий на полях ввода
        const monitorInputs = () => {
            const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[name="name"], input[name="password"]');

            inputs.forEach(input => {
                const logEvent = (eventType, extraData = {}) => {
                    console.log(`[AUTOFILL INPUT EVENT] ${eventType}:`, {
                        inputId: input.id,
                        inputName: input.name,
                        inputType: input.type,
                        value: input.value,
                        timestamp: new Date().toISOString(),
                        ...extraData
                    });
                };

                // События автозаполнения
                input.addEventListener('input', (e) => {
                    logEvent('INPUT', {
                        inputType: e.inputType,
                        data: e.data,
                        isComposing: e.isComposing
                    });
                });

                input.addEventListener('change', (e) => {
                    logEvent('CHANGE');
                });

                input.addEventListener('focus', (e) => {
                    logEvent('FOCUS');
                });

                input.addEventListener('blur', (e) => {
                    logEvent('BLUR');
                });

                // Отслеживание анимаций автозаполнения
                input.addEventListener('animationstart', (e) => {
                    if (e.animationName.includes('autofill')) {
                        logEvent('AUTOFILL_ANIMATION', {
                            animationName: e.animationName
                        });
                    }
                });
            });
        };

        // Добавляем слушателей событий
        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        // Перехват и анализ всех событий
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, listener, options) {
            if (this.tagName === 'INPUT' && ['input', 'change', 'focus', 'blur'].includes(type)) {
                const wrappedListener = function (event) {
                    try {
                        console.log('[INPUT EVENT INTERCEPTED]:', {
                            eventType: type,
                            inputId: this.id,
                            inputName: this.name,
                            value: this.value,
                            timestamp: new Date().toISOString()
                        });
                        return listener.call(this, event);
                    } catch (error) {
                        console.log('[INPUT EVENT ERROR]:', error);
                        throw error;
                    }
                };
                return originalAddEventListener.call(this, type, wrappedListener, options);
            }
            return originalAddEventListener.call(this, type, listener, options);
        };

        // Глубокий анализ Script Error
        const analyzeScriptError = (event) => {
            console.log('[SCRIPT ERROR DEEP ANALYSIS]:', {
                // Основная информация
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,

                // Детальная информация об ошибке
                errorObject: {
                    name: event.error?.name,
                    message: event.error?.message,
                    stack: event.error?.stack,
                    cause: event.error?.cause,
                    toString: event.error?.toString()
                },

                // Контекст выполнения
                context: {
                    url: window.location.href,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    documentReadyState: document.readyState
                },

                // Состояние DOM
                domState: {
                    activeElement: document.activeElement?.tagName + (document.activeElement?.id ? `#${document.activeElement.id}` : ''),
                    inputFields: Array.from(document.querySelectorAll('input')).map(input => ({
                        id: input.id,
                        name: input.name,
                        type: input.type,
                        hasValue: input.value.length > 0,
                        isAutofilled: input.matches?.(':-webkit-autofill') || false
                    }))
                },

                // Стек вызовов
                callStack: new Error().stack,

                // Попытка получить больше информации из браузера
                browserInfo: {
                    language: navigator.language,
                    platform: navigator.platform,
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine,
                    hardwareConcurrency: navigator.hardwareConcurrency
                }
            });
        };

        // Запускаем мониторинг с задержкой, чтобы DOM успел загрузиться
        const timeoutId = setTimeout(monitorInputs, 100);

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            console.error = originalConsoleError;
            EventTarget.prototype.addEventListener = originalAddEventListener;
        };
    }, []);
};

export default useAutofillLogger;