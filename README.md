# Farma-Proof: Prescription Management on Midnight Network

A privacy-preserving prescription management system built on Midnight Network using Compact smart contracts and OpenZeppelin Contracts-for-Compact.

## 🚀 Overview

Farma-Proof leverages Midnight Network's zero-knowledge capabilities to enable secure, private prescription management while maintaining regulatory compliance and audit trails. The system uses Compact smart contracts with selective disclosure, allowing patients to prove eligibility without revealing sensitive information.

## 🏗️ Architecture

### Core Components

#### A. Roles & Access Control
- **AccessControl**: ADMIN_ROLE, DOCTOR_ROLE, PHARMACY_ROLE, VERIFIER_ROLE
- **MedicineRegistry**: Central registry for medicine codes and policies
- **PrescriptionToken**: NFT-like tokens representing prescriptions
- **OrderEscrow**: Order management and fulfillment system

#### B. Privacy Features
- **Zero-Knowledge Proofs**: Selective disclosure of prescription eligibility
- **Shielded Fields**: Private patient data, prescription details, and quantities
- **Unshielded Events**: Public audit trails without PII exposure

## 📋 Smart Contracts

### MedicineRegistry.compact
```compact
// Admin-only functions
addMedicine(codeHash, name, maxQtyPerRx, status)
// Public queries
isValid(codeHash) -> bool
policy(codeHash) -> Policy
```

### PrescriptionToken.compact
```compact
// Doctor functions
mintRx(patientShieldedAddr, metaCommitment)
revokeRx(tokenId)

// Shielded fields (private)
patientCommitment, codeHash, expiresAt, qtyAllowed
// Unshielded fields (public)
tokenId, events
```

### OrderEscrow.compact
```compact
// Patient functions
createOrder(pharmacy, codeHash, qty, proofRefHash)
pay(orderId, asset)

// Verifier functions
acceptProof(orderId, attestation)

// Pharmacy functions
fulfill(orderId, tokenId)
```

## 🔐 Zero-Knowledge Proofs

### What Patients Prove
- Valid prescription token ownership
- Medicine code match
- Prescription not expired
- Sufficient quantity remaining
- Valid doctor signature

### Verification Flow
1. **Off-chain Prover**: Generates ZK proof + attestation
2. **Verifier Service**: Signs attestation (VERIFIER_ROLE)
3. **On-chain Validation**: OrderEscrow.acceptProof verifies signature

## 💰 Payment System

- **Fees**: Paid in Dust (Midnight Network's fee token)
- **Assets**: Compact fungible tokens for prescription payments
- **Escrow**: Secure payment handling until fulfillment

## 🔄 End-to-End Flow

```mermaid
sequenceDiagram
  participant Doc as Doctor (UI)
  participant PT as PrescriptionToken
  participant P as Patient (UI)
  participant Prov as ZK Prover (off-chain)
  participant Ver as Verifier Service
  participant Esc as OrderEscrow
  participant Reg as MedicineRegistry
  participant Pharm as Pharmacy (UI)

  Doc->>PT: mintRx(patientShieldedAddr, commitment)
  Note right of PT: tokenId=unique; shielded meta

  P->>Reg: lookup(codeHash)
  P->>Prov: request proof(codeHash,qty,tokenId?)
  Prov->>Ver: submit proof for attestation
  Ver-->>P: attestation + proofRefHash (signed)

  P->>Esc: createOrder(pharmacy, codeHash, qty, proofRefHash)
  Esc->>Reg: check isValid(codeHash)
  Ver-->>Esc: acceptProof(orderId, attestation)
  P->>Esc: pay(orderId, asset)
  Pharm->>Esc: fulfill(orderId, tokenId)
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (latest LTS)
- Compact compiler (compactc)
- Midnight Network testnet access
- Dust faucet for fees

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd farma-proof

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test
```

### Environment Setup
```bash
# Set Midnight Network configuration
export MIDNIGHT_RPC_URL=<testnet-rpc-url>
export MIDNIGHT_PRIVATE_KEY=<your-private-key>
export DUST_FAUCET_URL=<dust-faucet-url>
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:contracts
npm run test:integration
npm run test:zk

# Run with coverage
npm run test:coverage
```

## 📊 API Endpoints (Backend)

### ZK Proof Generation
```http
POST /zk/prove
Content-Type: application/json

{
  "codeHash": "string",
  "quantity": "number",
  "tokenId": "string"
}
```

### Attestation
```http
POST /zk/attest
Content-Type: application/json

{
  "proofRefHash": "string",
  "proof": "object"
}
```

### Prescription Management
```http
POST /vc/issue
Content-Type: application/json

{
  "patientAddress": "string",
  "medicineCode": "string",
  "quantity": "number",
  "expiryDate": "string"
}
```

### Medicine Registry
```http
GET /medicines
GET /medicines/{codeHash}
```

## 🚦 Development Roadmap

### Sprint 0: Tooling & Networks
- [ ] Compact toolchain setup
- [ ] Midnight testnet connection
- [ ] Dust faucet integration
- [ ] Monorepo + CI configuration

### Sprint 1: Core Infrastructure
- [ ] AccessControl implementation
- [ ] MedicineRegistry contract
- [ ] Admin panel operations

### Sprint 2: Prescription Tokens
- [ ] PrescriptionToken contract
- [ ] Mint/revoke functionality
- [ ] Shielded commitment handling

### Sprint 3: ZK Integration
- [ ] Off-chain prover service
- [ ] Verifier attestation flow
- [ ] Proof validation

### Sprint 4: Order Management
- [ ] OrderEscrow state machine
- [ ] Payment processing
- [ ] Fulfillment workflow

### Sprint 5: Hardening & Audit
- [ ] Security audit
- [ ] Threat modeling
- [ ] Dashboard development
- [ ] Performance optimization

## 🔒 Security & Privacy

### Privacy Guarantees
- **No PII on-chain**: Only commitments and hashes
- **Selective disclosure**: Prove eligibility without revealing identity
- **Audit trails**: Public events without sensitive data exposure

### Security Measures
- **Access Control**: Role-based permissions throughout
- **Pausable contracts**: Emergency stop mechanisms
- **Key rotation**: Verifier service key management
- **Circuit validation**: Comprehensive ZK proof testing

## 📚 Resources

- [Midnight Network Documentation](https://docs.midnight.network/)
- [Compact Language Reference](https://docs.midnight.network/compact/)
- [OpenZeppelin Contracts-for-Compact](https://github.com/OpenZeppelin/contracts-for-compact)
- [ZK Proof Concepts](https://docs.midnight.network/zk-proofs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Community**: [Midnight Network Discord](link-to-discord)

## 🔮 Future Enhancements

- **Multi-chain support**: Extend to other privacy-focused blockchains
- **Advanced ZK circuits**: More sophisticated proof generation
- **Mobile SDK**: Native mobile application support
- **Regulatory compliance**: Built-in compliance reporting tools
- **Analytics dashboard**: Advanced analytics and insights

---

**Built with ❤️ on Midnight Network**
