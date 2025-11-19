const { birthBridgeApi } = require("../environment");


const commonTemplate = (name, templateBody) => `
    <div style="background-color: #f0f0f0; padding: 30px; width:100%">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center">
                    <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); max-width: 600px; text-align: left;">
                        <div style="text-align: center; margin-bottom: 10px;">
                            <div style="display: inline-flex; align-items: center; justify-content: center; width: 100%;">
                                <span style="font-size: 34px; font-weight: bold; color:#AED9E0;">WEB1EXPERTS</span>
                            </div>
                        </div>
                        <p style="font-size: 14px; color: #555;">Hi ${name} 👋,</p>
                        <div style="margin-top: 30px; margin-bottom: 30px;">
                            <div>
                                ${templateBody}
                            </div>
                        </div>
                        <div>
                            <p style="font-size: 14px; color: #777; margin-top: 20px;">
                                <span>Best regards,</span> <br>
                                <span style="margin-top:30px;">The WEB1EXPERTS Team</span>
                            </p>
                            <p style="font-size: 12px; color: #777; display:flex; justify-content:center; align-items:center; margin-top: 20px;">
                                Visit our <a href="https://abc.com" style="font-weight:bold; margin-left:2px;">Website</a>
                                <span style="display: inline-block; width: 1px; height: 30px; background-color: #777; margin: 0 10px;"></span>
                                Follow us on <a href="https://abc.com" style="font-weight:bold; margin-left:2px;">Instagram</a>
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
`

const emailTemplates = {
    OtpEmail: {
        subject: 'One Time Code Received',
        body: ({ name, otp }) => {
            let body = `
                <p style="font-size: 14px; margin-top: 10px;">
                    Your One Time Password 
                </p>
                <p style="margin-top: 20px;margin-bottom: 20px;">
                    <span 
                        style="color: rgba(255, 255, 255, 1);font-size: 14px;border-top: 15px solid rgba(204, 0, 0, 1);border-right: 30px solid rgba(204, 0, 0, 1);border-bottom: 15px solid rgba(204, 0, 0, 1);border-left: 30px solid rgba(204, 0, 0, 1);display: inline-block;background: rgba(204, 0, 0, 1);border-radius: 2px;font-family: helvetica, &quot;helvetica neue&quot;, arial, verdana, sans-serif;font-weight: normal;font-style: normal;line-height: 14px;width: auto;text-align: center"
                    >
                        ${otp}
                    </span>
                </p>
            `
            return commonTemplate(name, body)
        }
    },
   
};

module.exports = emailTemplates