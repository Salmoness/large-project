const sendEmail = require('../utils/sendEmail');
const sgMail = require('@sendgrid/mail');

jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn(),
}));

describe('sendEmail', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.SENDGRID_API_KEY = 'fake-api-key';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should call sgMail.send with correct message', async () => {
        sgMail.send.mockResolvedValueOnce([{ statusCode: 202 }]);

        const to = 'user@example.com';
        const subject = 'Test Subject';
        const html = '<p>Hello world</p>';

        await sendEmail(to, subject, html);

        expect(sgMail.setApiKey).toHaveBeenCalledWith('fake-api-key');
        expect(sgMail.send).toHaveBeenCalledWith({
            to,
            from: 'noreply@hopethiswork.com',
            subject,
            html,
        });
    });

    test('should catch and log error if sgMail.send throws', async () => {
        const error = new Error('Failed to send');
        error.response = { body: { errors: ['Invalid email'] } };
        sgMail.send.mockRejectedValueOnce(error);

        console.error = jest.fn();

        await sendEmail('user@example.com', 'Subject', '<p>Body</p>');

        expect(console.error).toHaveBeenCalledWith('❌ SendGrid error:', error);
        expect(console.error).toHaveBeenCalledWith('🔍 Response body:', error.response.body);
    });
});