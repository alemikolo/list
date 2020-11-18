import { AuthMailData, MessageCreator } from '../types';

const SignUpConfirmation: MessageCreator<AuthMailData> = data => {
  const { recipient, redirectUrl, user } = data;
  const subject = 'confirm registration';
  const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <center>
            <table>
              <tr>
                <td>
                  App
                </td>
              </tr>
              <tr> 
                <td>
                  title
                </td>
              </tr>
              <tr>
                <td>
                  Hey,
                </td>
              </tr>
              <tr>
                <td>info</td>
              </tr>
              <tr>
                <td>Sincerely, ${user}</td>
              </tr>
              <tr>
                <td>sender</td>
              </tr>
              <tr>
                <td>
                  <a href="${redirectUrl}">
                    link
                  </a>
                </td>
              </tr>
            </table>
          </center>
        </body>
      </html>
   `;

  return { html, recipient, subject };
};

export default SignUpConfirmation;
