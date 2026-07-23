# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in PR Sentinel, please **do not** open a public GitHub issue. Instead, please report it responsibly by:

1. **Email:** Send a detailed report to the repository maintainer
2. **Include:** 
   - Description of the vulnerability
   - Steps to reproduce (if applicable)
   - Potential impact
   - Suggested fix (if you have one)

## Security Considerations

### API Key Management
- **Never** commit API keys, tokens, or credentials to version control
- Use GitHub Secrets for storing `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, and AWS credentials
- Configure your `.env` file in `.gitignore` to prevent accidental commits

### Data Privacy
- PR Sentinel analyzes pull request diffs, which may contain sensitive data
- Review your diffs before PR Sentinel processes them
- For private data handling, consider self-hosting with local models (Ollama)

### Model Provider Security
- **Anthropic (Claude):** Uses HTTPS and encrypted transmission. See [Anthropic Security](https://www.anthropic.com/security)
- **OpenAI (GPT-4):** Uses HTTPS and encrypted transmission. See [OpenAI Security](https://openai.com/security)
- **AWS Bedrock:** Inherits AWS security guarantees. See [AWS Bedrock Security](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)
- **Ollama (Local):** No data leaves your machine. Requires self-hosting

### Dependency Security
- PR Sentinel uses well-maintained dependencies: Octokit, @actions/core, TypeScript
- Monitor GitHub's dependency alerts for security updates
- Run `npm audit` regularly to check for vulnerabilities in dependencies

### CI/CD Security
- The action integrates with GitHub Actions; ensure your workflow permissions are minimal
- Use `contents: read` and `security-events: write` only (as shown in docs)
- Restrict secrets to specific branch protection rules

## Vulnerability Disclosure Timeline

1. **Report:** Send security report to maintainer
2. **Acknowledgment:** You'll receive confirmation within 24-48 hours
3. **Investigation:** We'll investigate and develop a fix
4. **Disclosure:** Once fixed, we'll publish a security advisory and release an updated version
5. **Public Notice:** Security fix will be announced in release notes

## Security Best Practices for Users

1. **Keep PR Sentinel Updated:**
   ```yaml
   uses: nshportun/prSentinel@v0.1.0  # Pin to specific version
   ```

2. **Use Read-Only Tokens When Possible:**
   ```yaml
   permissions:
     contents: read          # Read-only access
     security-events: write  # Write to security tab only
   ```

3. **Monitor Your Dependencies:**
   - Enable GitHub Dependabot alerts
   - Review dependency updates before merging

4. **Review Generated Reports:**
   - Check SARIF reports in GitHub Security tab
   - Verify false positives in your CI logs
   - Take action on detected issues

## Known Security Limitations

- **Schema Detection:** LLM-based schema analysis may have false negatives on novel data formats
- **PII Patterns:** AI-powered PII detection depends on model accuracy; edge cases may be missed
- **Regex Patterns:** Secret detection uses regex patterns which can generate false positives

## Security Hardening

For maximum security:

1. **Use Local Models:**
   ```yaml
   model-provider: ollama
   ```
   This keeps all data local and doesn't transmit diffs to external APIs.

2. **Air-Gapped Deployment:**
   Run the action in an air-gapped environment with local model inference.

3. **Audit Logs:**
   Monitor GitHub Actions logs for unusual activity or configuration changes.

## Questions?

If you have security questions or concerns (non-vulnerability), feel free to:
- Open a discussion: https://github.com/nshportun/prSentinel/discussions
- Check documentation: https://github.com/nshportun/prSentinel#readme

---

**Last Updated:** 2026-07-23
