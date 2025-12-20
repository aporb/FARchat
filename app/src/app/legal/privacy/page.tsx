export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl prose">
            <h1>Privacy Policy</h1>
            <p>Last Updated: December 2025</p>

            <h2>1. Introduction</h2>
            <p>FARchat respects your privacy. This policy explains how we handle your data.</p>

            <h2>2. Data Collection</h2>
            <p>
                <strong>Usage Data:</strong> We collect queries and interactions to improve our AI models. <br />
                <strong>Account Data:</strong> If you sign up, we store your email address via Supabase Auth.
            </p>

            <h2>3. Government Data</h2>
            <p>
                FARchat is currently an <strong>Alpha</strong> preview. Do not input CUI (Controlled Unclassified Information) or Classified information into the chat.
            </p>
        </div>
    )
}
