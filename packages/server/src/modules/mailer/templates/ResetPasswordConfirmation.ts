import { AuthMailData, MessageCreator } from '../types';

const ResetPasswordConfirmation: MessageCreator<AuthMailData> = data => {
  const { recipient } = data;
  const subject = 'title';
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
                <td>Sincerely, ${data}</td>
              </tr>
              <tr>
                <td>sender</td>
              </tr>
              <tr>
                <td>
                  <a href="http://handle-it}">
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

export default ResetPasswordConfirmation;
