import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-light-primary dark:bg-dark-primary border-2 border-brand-slate-light/30 dark:border-brand-slate/30 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b-2 border-brand-slate-light/30 dark:border-brand-slate/30 bg-gradient-to-r from-light-secondary to-light-primary dark:from-dark-secondary dark:to-dark-primary sticky top-0 z-10">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
            Privacy Policy
          </h1>
          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] sm:w-11 sm:h-11 sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-light-secondary/50 dark:bg-dark-tertiary/50 hover:bg-gradient-to-br hover:from-brand-teal-mid/20 hover:to-brand-emerald-mid/20 border-2 border-brand-slate-light/30 dark:border-brand-slate/30 hover:border-brand-teal-mid flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-text-light-secondary dark:text-text-dark-secondary group-hover:text-brand-teal-mid transition-colors" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 text-text-light-secondary dark:text-text-dark-secondary">
          <p className="text-sm">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section>
            <h2 className="font-display text-lg sm:text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2 sm:mb-3">
              1. Introduction
            </h2>
            <p className="mb-3">
              Welcome to DashboardX ("we," "our," or "us"). DashboardX.co operates an AI-powered data analysis platform utilizing Agentic RAG (Retrieval-Augmented Generation) technology and AG UI (Agentic GUI) to help enterprises analyze and visualize their data.
            </p>
            <p>
              We understand that enterprise data is highly sensitive and confidential. This Privacy Policy explains how we collect, use, protect, and handle your information when you use our services. We are committed to maintaining the highest standards of data security and privacy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              2. Information We Collect
            </h2>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              2.1 Enterprise Data
            </h3>
            <p className="mb-2">
              When you use DashboardX, you may upload, integrate, or connect various types of enterprise data including:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Business documents and files</li>
              <li>Database contents and schemas</li>
              <li>Analytics and performance metrics</li>
              <li>Internal communications and reports</li>
              <li>Customer and operational data</li>
              <li>Any other proprietary business information you choose to analyze through our platform</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              2.2 Account Information
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Company name and role</li>
              <li>Authentication credentials</li>
              <li>Billing and payment information</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              2.3 Usage Data
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Platform interaction logs</li>
              <li>Query patterns and analysis requests</li>
              <li>Feature usage statistics</li>
              <li>Performance and error logs</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              3. How We Use Your Information
            </h2>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              3.1 Service Delivery
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Process and analyze your data using our Agentic RAG technology</li>
              <li>Generate visual insights through AG UI</li>
              <li>Provide real-time data analysis and recommendations</li>
              <li>Maintain and improve platform performance</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              3.2 Critical Commitment: Data Isolation
            </h3>
            <p className="font-semibold bg-light-secondary dark:bg-dark-secondary p-3 rounded-lg border-l-4 border-brand-teal-mid">
              Your enterprise data is NEVER used to train AI models, is NEVER shared across organizations, and is NEVER accessible to other customers. Each organization's data remains completely isolated and is used solely for that organization's analysis purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              4. Data Security and Protection
            </h2>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              4.1 Encryption
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>End-to-end encryption for data in transit (TLS 1.3)</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Encrypted database connections</li>
              <li>Secure API communications</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              4.2 Access Controls
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Multi-factor authentication (MFA)</li>
              <li>Role-based access control (RBAC)</li>
              <li>Principle of least privilege</li>
              <li>Regular access audits and reviews</li>
              <li>Automatic session timeouts</li>
            </ul>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              4.3 Infrastructure Security
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>SOC 2 Type II compliant infrastructure</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Isolated tenant environments</li>
              <li>24/7 security monitoring and incident response</li>
              <li>Regular backup and disaster recovery procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              5. Data Retention and Deletion
            </h2>
            <p className="mb-2">
              We retain your enterprise data only as long as necessary to provide our services or as required by law:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li><strong>Active Data:</strong> Retained while your account is active and you continue to use our services</li>
              <li><strong>Account Deletion:</strong> Upon request, we will permanently delete your data within 30 days</li>
              <li><strong>Backup Data:</strong> Deleted from backups within 90 days of deletion request</li>
              <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law or legal proceedings</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              6. Data Sharing and Disclosure
            </h2>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              6.1 We Do NOT Share Your Enterprise Data
            </h3>
            <p className="mb-3">
              Your enterprise data analyzed through DashboardX is NEVER sold, shared, or disclosed to third parties for marketing or any other purposes.
            </p>

            <h3 className="font-display text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 mt-3">
              6.2 Limited Exceptions
            </h3>
            <p className="mb-2">We may disclose information only in these specific circumstances:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
              <li><strong>Service Providers:</strong> Trusted third-party providers who assist in service delivery (under strict confidentiality agreements)</li>
              <li><strong>Legal Obligations:</strong> When required by law, subpoena, or court order</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (with advance notice to you)</li>
              <li><strong>Security Threats:</strong> To protect against fraud, security threats, or illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              7. Your Rights and Controls
            </h2>
            <p className="mb-2">You have the following rights regarding your data:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li><strong>Access:</strong> Request access to your data at any time</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your data</li>
              <li><strong>Export:</strong> Download your data in portable formats</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Objection:</strong> Object to certain data processing activities</li>
              <li><strong>Portability:</strong> Transfer your data to another service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              8. Compliance and Certifications
            </h2>
            <p className="mb-2">DashboardX complies with:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA)</li>
              <li>SOC 2 Type II standards</li>
              <li>ISO 27001 information security standards</li>
              <li>Industry-specific regulations as applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              9. International Data Transfers
            </h2>
            <p className="mb-2">
              If you are located outside the country where our servers are located, your data may be transferred internationally. We ensure that such transfers comply with applicable data protection laws through:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Adequacy decisions</li>
              <li>Other lawful transfer mechanisms</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              10. Cookies and Tracking Technologies
            </h2>
            <p className="mb-2">
              We use essential cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Maintain your session and authentication</li>
              <li>Remember your preferences</li>
              <li>Analyze platform usage (aggregated and anonymized)</li>
              <li>Improve user experience</li>
            </ul>
            <p className="mt-2">
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              11. Children's Privacy
            </h2>
            <p>
              DashboardX is designed for enterprise use and is not intended for individuals under 18 years of age. We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              12. Changes to This Privacy Policy
            </h2>
            <p className="mb-2">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Email notification to your registered address</li>
              <li>Prominent notice on our platform</li>
              <li>In-app notifications</li>
            </ul>
            <p>
              Your continued use of DashboardX after changes become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3">
              13. Contact Us
            </h2>
            <p className="mb-3">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg border-2 border-brand-slate-light/30 dark:border-brand-slate/30">
              <p className="mb-2"><strong>DashboardX Privacy Team</strong></p>
              <p>Email: cc@dashboardx.co</p>
            </div>
          </section>

          <section className="pt-6 border-t-2 border-brand-slate-light/30 dark:border-brand-slate/30">
            <p className="text-sm italic">
              By using DashboardX, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. We are committed to protecting your enterprise data with the highest standards of security and confidentiality.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
