/* eslint-env browser */
/* jslint-env browser */
/* global window */
/* global document */
/* global console */

/*
 * roar - v1.0.5 - 2018-05-25
 * https://getbutterfly.com/roarjs-vanilla-javascript-alert-confirm-replacement/
 * Copyright (c) 2018 Ciprian Popescu
 * Licensed GPLv3
 */

const showAlert = () => {
    let roarAlert;

    return (
        (title, message, options) => {

        // supported animations
        const animations = {
            roarShow: 'roarShow',
            bounceIn: 'bounceIn'
        }

        const alertTypes = {
            nonModal: 'nonModal',
            modal: 'modal',
        }

        if (typeof options !== 'object') options = {}

        if (typeof options.animation !== 'string') options.animation = ''

        if (typeof options.type !== 'string') options.type = ''

        if (!roarAlert) {
            roarAlert = {
                element: null,
                cancelElement: null,
                confirmElement: null
            };

            roarAlert.element = document.querySelector('.roar-alert');
        } else {
            // Show alert
            document.body.classList.add('roar-open');
            roarAlert.element.style.display = 'block';
        }

        // Define default options
        roarAlert.animation = animations.hasOwnProperty(options.animation) ? options.animation : animations.roarShow
        roarAlert.type = alertTypes.hasOwnProperty(options.type) ? options.type : alertTypes.nonModal
        roarAlert.cancel = options.cancel !== undefined ? options.cancel : false;
        roarAlert.cancelText = options.cancelText !== undefined ? options.cancelText : 'Cancel';
        roarAlert.cancelCallBack = function (event) {
            document.querySelector('.roar-alert-mask').removeEventListener('click', onClickOutsideAlertHandler)

            document.body.classList.remove('roar-open');
            roarAlert.element.style.display = 'none';
            // Cancel callback
            if (typeof options.cancelCallBack === 'function') {
                options.cancelCallBack(event);
            }

            // Cancelled
            return true;
        };

        roarAlert.message = message;
        roarAlert.title = title;
        roarAlert.confirm = options.confirm !== undefined ? options.confirm : true;
        roarAlert.confirmText = options.confirmText !== undefined ? options.confirmText : 'Confirm';
        roarAlert.confirmCallBack = function (event) {
            document.querySelector('.roar-alert-mask').removeEventListener('click', onClickOutsideAlertHandler)

            document.body.classList.remove('roar-open');
            roarAlert.element.style.display = 'none';
            // Confirm callback
            if (typeof options.confirmCallBack === 'function') {
                options.confirmCallBack(event);
            }

            // Confirmed
            return true;
        };

        if (!roarAlert.element) {
            roarAlert.html =
                '<div class="roar-alert" id="roar-alert" role="alertdialog">' +
                '<div class="roar-alert-mask"></div>' +
                '<div class="roar-alert-message-body" role="alert" aria-relevant="all">' +
                '<div class="roar-alert-message-tbf roar-alert-message-title">' +
                roarAlert.title +
                '</div>' +
                '<div class="roar-alert-message-tbf roar-alert-message-content">' +
                roarAlert.message +
                '</div>' +
                '<div class="roar-alert-message-tbf roar-alert-message-button">';

            if (roarAlert.cancel || true) {
                roarAlert.html += '<a href="javascript:;" class="roar-alert-message-tbf roar-alert-message-button-cancel">' + roarAlert.cancelText + '</a>';
            }

            if (roarAlert.confirm || true) {
                roarAlert.html += '<a href="javascript:;" class="roar-alert-message-tbf roar-alert-message-button-confirm">' + roarAlert.confirmText + '</a>';
            }

            roarAlert.html += '</div></div></div>';

            const element = document.createElement('div');
            element.id = 'roar-alert-wrap';
            element.innerHTML = roarAlert.html;
            document.body.appendChild(element);

            // Close alert on click outside
            if (document.querySelector('.roar-alert-mask')) {
                document.querySelector('.roar-alert-mask').addEventListener('click', onClickOutsideAlertHandler);
            }

            roarAlert.element = document.querySelector('.roar-alert');

            roarAlert.cancelElement = document.querySelector('.roar-alert-message-button-cancel');

            // Enabled cancel button callback
            if (roarAlert.cancel) {
                document.querySelector('.roar-alert-message-button-cancel').style.display = 'block';
            } else {
                document.querySelector('.roar-alert-message-button-cancel').style.display = 'none';
            }

            // Enabled confirm button callback
            roarAlert.confirmElement = document.querySelector('.roar-alert-message-button-confirm');
            if (roarAlert.confirm) {
                document.querySelector('.roar-alert-message-button-confirm').style.display = 'block';
            } else {
                document.querySelector('.roar-alert-message-button-confirm').style.display = 'none';
            }

            roarAlert.cancelElement.onclick = roarAlert.cancelCallBack;
            roarAlert.confirmElement.onclick = roarAlert.confirmCallBack;
        }

        document.querySelector('.roar-alert-message-title').innerHTML = '';
        document.querySelector('.roar-alert-message-content').innerHTML = '';

        document.querySelector('.roar-alert-message-button-cancel').innerHTML = roarAlert.cancelText;
        document.querySelector('.roar-alert-message-button-confirm').innerHTML = roarAlert.confirmText;

        roarAlert.cancelElement = document.querySelector('.roar-alert-message-button-cancel');

        // Enabled cancel button callback
        if (roarAlert.cancel) {
            document.querySelector('.roar-alert-message-button-cancel').style.display = 'block';
        } else {
            document.querySelector('.roar-alert-message-button-cancel').style.display = 'none';
        }

        roarAlert.confirmElement = document.querySelector('.roar-alert-message-button-confirm');

        // Enabled confirm button callback
        if (roarAlert.confirm) {
            document.querySelector('.roar-alert-message-button-confirm').style.display = 'block';
        } else {
            document.querySelector('.roar-alert-message-button-confirm').style.display = 'none';
        }

        roarAlert.cancelElement.onclick = roarAlert.cancelCallBack;
        roarAlert.confirmElement.onclick = roarAlert.confirmCallBack;

        // Set title and message
        roarAlert.title = roarAlert.title || '';
        roarAlert.message = roarAlert.message || '';

        document.querySelector('.roar-alert-message-title').innerHTML = roarAlert.title;
        document.querySelector('.roar-alert-message-content').innerHTML = roarAlert.message;

        // Prevent closing roar alert when animating
        document.querySelector('.roar-alert-message-body').onanimationstart = (event) => {
            document.querySelector('.roar-alert-mask').removeEventListener('click', onClickOutsideAlertHandler)
        }

        // Allow roar alert to close after it finished animating
        document.querySelector('.roar-alert-message-body').onanimationend = (event) => {
            document.querySelector('.roar-alert-mask').addEventListener('click', onClickOutsideAlertHandler)
        }

        // Set animation
        document.querySelector('.roar-alert-message-body').style.animation = roarAlert.animation + ' 0.3s';
        document.querySelector('.roar-alert-message-body').style.webkitAnimation = roarAlert.animation + ' 0.3s'

        // Callback function when clicking outside roar alert
        const onClickOutsideAlertHandler = (event) => {
            // Do NOT close next animated roar alert
            document.querySelector('.roar-alert-mask').removeEventListener('click', onClickOutsideAlertHandler)

            if(roarAlert.type === 'modal') return true // do NOT close alert if type is modal

            document.body.classList.remove('roar-open');
            roarAlert.element.style.display = 'none';
            // Cancel callback
            if (typeof options.cancelCallBack === 'function') {
                options.cancelCallBack(event);
            }

            // Clicked outside
            return true;
        }
    })
}

export const roar = showAlert()

export default roar