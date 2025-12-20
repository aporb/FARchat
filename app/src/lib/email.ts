import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({
    to,
    subject,
    html,
    from = 'FARchat <login@farchat.app>'
}: {
    to: string
    subject: string
    html: string
    from?: string
}) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not set. Email not sent.')
        return { error: 'RESEND_API_KEY missing' }
    }

    try {
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html,
        })

        if (error) {
            console.error('Resend Error:', error)
            return { error: error.message }
        }

        return { data }
    } catch (error: any) {
        console.error('Email Send Exception:', error)
        return { error: error.message }
    }
}
