// Email_messages/confirmationEmail.js

/**
 * Email template module for shipping notifications
 * @module confirmationEmail
 */

module.exports = {
    /**
     * Generates booking confirmation email template
     * @param {Object} booking - Booking details
     * @returns {String} HTML email content
     */
    bookingConfirmation: (booking) => {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipping Confirmation</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background-color: #f4f4f4;
            padding: 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background-color: #1a67a3;
            color: white;
            padding: 20px;
            text-align: center;
          }
          
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .content {
            padding: 30px;
            color: #333;
          }
          
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
          }
          
          .details {
            background-color: #f9f9f9;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 20px;
          }
          
          .details-heading {
            color: #1a67a3;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          
          .detail-row {
            display: flex;
            margin-bottom: 12px;
          }
          
          .detail-label {
            flex: 1;
            font-weight: bold;
            color: #555;
          }
          
          .detail-value {
            flex: 2;
          }
          
          .status {
            display: flex;
            margin: 25px 0;
            justify-content: space-between;
            position: relative;
          }
          
          .status::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: #ddd;
            z-index: 1;
          }
          
          .status-step {
            position: relative;
            z-index: 2;
            text-align: center;
            width: 33%;
          }
          
          .status-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            font-weight: bold;
            color: white;
          }
          
          .status-label {
            font-size: 14px;
            color: #777;
          }
          
          .status-active .status-circle {
            background-color: #1a67a3;
          }
          
          .status-active .status-label {
            color: #1a67a3;
            font-weight: bold;
          }
          
          .message {
            margin-bottom: 20px;
            line-height: 1.6;
          }
          
          .cta {
            text-align: center;
            margin: 30px 0 20px;
          }
          
          .button {
            display: inline-block;
            background-color: #1a67a3;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
          }
          
          .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            color: #777;
            font-size: 14px;
          }
          
          .contact {
            margin-top: 20px;
          }
          
          @media (max-width: 600px) {
            .detail-row {
              flex-direction: column;
            }
            
            .detail-label {
              margin-bottom: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Oceanic Shipping Co.</div>
            <div>Shipping Confirmation</div>
          </div>
          
          <div class="content">
            <div class="greeting">Hello ${booking.name},</div>
            
            <div class="message">
              Thank you for choosing our shipping services. We're pleased to confirm that your shipment has been booked successfully!
            </div>
            
            <div class="details">
              <div class="details-heading">Shipping Details</div>
              
              <div class="detail-row">
                <div class="detail-label">From:</div>
                <div class="detail-value">${booking.start_port}, ${booking.start_country}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">To:</div>
                <div class="detail-value">${booking.end_port}, ${booking.end_country}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Expected Delivery:</div>
                <div class="detail-value">${booking.delivery_date}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Shipping Cost:</div>
                <div class="detail-value">$${booking.cost.toFixed(2)}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Invoice Number:</div>
                <div class="detail-value">${booking.shipping_invoice}</div>
              </div>
            </div>
            
            <div class="status">
              <div class="status-step status-active">
                <div class="status-circle">1</div>
                <div class="status-label">Confirmed</div>
              </div>
              
              <div class="status-step">
                <div class="status-circle">2</div>
                <div class="status-label">Departed</div>
              </div>
              
              <div class="status-step">
                <div class="status-circle">3</div>
                <div class="status-label">Delivered</div>
              </div>
            </div>
            
            <div class="message">
              Your shipment has been confirmed and is now being processed. You will receive another email when your shipment departs from ${booking.start_port}.
            </div>
  
          </div>
          
          <div class="footer">
            <div>© ${new Date().getFullYear()} Oceanic Shipping Co. All rights reserved.</div>
            <div class="contact">
              If you have any questions, please contact us at support@example.com
            </div>
          </div>
        </div>
      </body>
      </html>
      `;
    },
  
    /**
     * Generates departure notification email template
     * @param {Object} booking - Booking details
     * @returns {String} HTML email content
     */
    departureMail: (booking) => {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipment Departed</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background-color: #f4f4f4;
            padding: 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background-color: #0d7c3e;
            color: white;
            padding: 20px;
            text-align: center;
          }
          
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .content {
            padding: 30px;
            color: #333;
          }
          
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
          }
          
          .details {
            background-color: #f9f9f9;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 20px;
          }
          
          .details-heading {
            color: #0d7c3e;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          
          .detail-row {
            display: flex;
            margin-bottom: 12px;
          }
          
          .detail-label {
            flex: 1;
            font-weight: bold;
            color: #555;
          }
          
          .detail-value {
            flex: 2;
          }
          
          .status {
            display: flex;
            margin: 25px 0;
            justify-content: space-between;
            position: relative;
          }
          
          .status::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: #ddd;
            z-index: 1;
          }
          
          .status-step {
            position: relative;
            z-index: 2;
            text-align: center;
            width: 33%;
          }
          
          .status-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            font-weight: bold;
            color: white;
          }
          
          .status-label {
            font-size: 14px;
            color: #777;
          }
          
          .status-active .status-circle {
            background-color: #0d7c3e;
          }
          
          .status-active .status-label {
            color: #0d7c3e;
            font-weight: bold;
          }
          
          .status-complete .status-circle {
            background-color: #0d7c3e;
          }
          
          .map-container {
            margin: 20px 0;
            height: 200px;
            background-color: #f0f0f0;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #777;
          }
          
          .message {
            margin-bottom: 20px;
            line-height: 1.6;
          }
          
          .cta {
            text-align: center;
            margin: 30px 0 20px;
          }
          
          .button {
            display: inline-block;
            background-color: #0d7c3e;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
          }
          
          .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            color: #777;
            font-size: 14px;
          }
          
          .contact {
            margin-top: 20px;
          }
          
          @media (max-width: 600px) {
            .detail-row {
              flex-direction: column;
            }
            
            .detail-label {
              margin-bottom: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Oceanic Shipping Co.</div>
            <div>Shipment Departed</div>
          </div>
          
          <div class="content">
            <div class="greeting">Hello ${booking.name},</div>
            
            <div class="message">
              Great news! Your shipment has departed from ${booking.start_port} and is now on its way to ${booking.end_port}.
            </div>
            
            <div class="details">
              <div class="details-heading">Shipping Details</div>
              
              <div class="detail-row">
                <div class="detail-label">Invoice Number:</div>
                <div class="detail-value">${booking.shipping_invoice}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">From:</div>
                <div class="detail-value">${booking.start_port}, ${booking.start_country}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">To:</div>
                <div class="detail-value">${booking.end_port}, ${booking.end_country}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Departure Date:</div>
                <div class="detail-value">${new Date().toISOString().split('T')[0]}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Expected Delivery:</div>
                <div class="detail-value">${booking.delivery_date}</div>
              </div>
            </div>
            
            <div class="map-container">
              [Shipment Route Map]
            </div>
            
            <div class="status">
              <div class="status-step status-complete">
                <div class="status-circle">✓</div>
                <div class="status-label">Confirmed</div>
              </div>
              
              <div class="status-step status-active">
                <div class="status-circle">2</div>
                <div class="status-label">Departed</div>
              </div>
              
              <div class="status-step">
                <div class="status-circle">3</div>
                <div class="status-label">Delivered</div>
              </div>
            </div>
            
            <div class="message">
              Your shipment is now in transit and is expected to arrive at ${booking.end_port} by ${booking.delivery_date}. You will receive another email when your shipment is delivered.
            </div>
            
            <div class="cta">
              <a href="https://example.com/track/${booking.shipping_invoice}" class="button">Track Your Shipment</a>
            </div>
          </div>
          
          <div class="footer">
            <div>© ${new Date().getFullYear()} Oceanic Shipping Co. All rights reserved.</div>
            <div class="contact">
              If you have any questions, please contact us at support@example.com
            </div>
          </div>
        </div>
      </body>
      </html>
      `;
    },
  
    /**
     * Generates delivery notification email template
     * @param {Object} booking - Booking details
     * @returns {String} HTML email content
     */
    deliveryMail: (booking) => {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipment Delivered</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
            background-color: #f4f4f4;
            padding: 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background-color: #28a745;
            color: white;
            padding: 20px;
            text-align: center;
          }
          
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .content {
            padding: 30px;
            color: #333;
          }
          
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
          }
          
          .details {
            background-color: #f9f9f9;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 20px;
          }
          
          .details-heading {
            color: #28a745;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          
          .detail-row {
            display: flex;
            margin-bottom: 12px;
          }
          
          .detail-label {
            flex: 1;
            font-weight: bold;
            color: #555;
          }
          
          .detail-value {
            flex: 2;
          }
          
          .status {
            display: flex;
            margin: 25px 0;
            justify-content: space-between;
            position: relative;
          }
          
          .status::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: #ddd;
            z-index: 1;
          }
          
          .status-step {
            position: relative;
            z-index: 2;
            text-align: center;
            width: 33%;
          }
          
          .status-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            font-weight: bold;
            color: white;
          }
          
          .status-label {
            font-size: 14px;
            color: #777;
          }
          
          .status-active .status-circle {
            background-color: #28a745;
          }
          
          .status-active .status-label {
            color: #28a745;
            font-weight: bold;
          }
          
          .status-complete .status-circle {
            background-color: #28a745;
          }
          
          .message {
            margin-bottom: 20px;
            line-height: 1.6;
          }
          
          .highlight {
            font-size: 18px;
            font-weight: bold;
            color: #28a745;
            text-align: center;
            margin: 30px 0;
            padding: 15px;
            border: 2px solid #28a745;
            border-radius: 6px;
          }
          
          .cta {
            text-align: center;
            margin: 30px 0 20px;
          }
          
          .button {
            display: inline-block;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-weight: bold;
          }
          
          .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            color: #777;
            font-size: 14px;
          }
          
          .contact {
            margin-top: 20px;
          }
          
          @media (max-width: 600px) {
            .detail-row {
              flex-direction: column;
            }
            
            .detail-label {
              margin-bottom: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Oceanic Shipping Co.</div>
            <div>Shipment Delivered</div>
          </div>
          
          <div class="content">
            <div class="greeting">Hello ${booking.name},</div>
            
            <div class="message">
              We're pleased to inform you that your shipment has been successfully delivered to ${booking.end_port}, ${booking.end_country}.
            </div>
            
            <div class="highlight">
              Your shipment has been successfully delivered!
            </div>
            
            <div class="details">
              <div class="details-heading">Delivery Details</div>
              
              <div class="detail-row">
                <div class="detail-label">Invoice Number:</div>
                <div class="detail-value">${booking.shipping_invoice}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">From:</div>
                <div class="detail-value">${booking.start_port}, ${booking.start_country}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">To:</div>
                <div class="detail-value">${booking.end_port}, ${booking.end_country}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Delivery Date:</div>
                <div class="detail-value">${new Date().toISOString().split('T')[0]}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Shipping Cost:</div>
                <div class="detail-value">$${booking.cost.toFixed(2)}</div>
              </div>
            </div>
            
            <div class="status">
              <div class="status-step status-complete">
                <div class="status-circle">✓</div>
                <div class="status-label">Confirmed</div>
              </div>
              
              <div class="status-step status-complete">
                <div class="status-circle">✓</div>
                <div class="status-label">Departed</div>
              </div>
              
              <div class="status-step status-active">
                <div class="status-circle">3</div>
                <div class="status-label">Delivered</div>
              </div>
            </div>
            
            <div class="message">
              Thank you for choosing Oceanic Shipping Co. We hope your experience was satisfactory. If you have any questions or need further assistance, please don't hesitate to contact us.
            </div>
            
            <div class="cta">
              <a href="https://example.com/feedback/${booking.shipping_invoice}" class="button">Rate Your Experience</a>
            </div>
          </div>
          
          <div class="footer">
            <div>© ${new Date().getFullYear()} Oceanic Shipping Co. All rights reserved.</div>
            <div class="contact">
              If you have any questions, please contact us at support@example.com
            </div>
          </div>
        </div>
      </body>
      </html>
      `;
    }
  };