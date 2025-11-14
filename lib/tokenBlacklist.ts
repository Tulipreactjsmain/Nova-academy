class TokenBlacklist {
  private static blacklist: Set<string> = new Set();
  private static cleanupInterval: NodeJS.Timeout;

  static addToken(token: string) {
    this.blacklist.add(token);

    // Auto-cleanup after token expiry (1 hour)
    setTimeout(() => {
      this.blacklist.delete(token);
    }, 3600 * 1000); // 1 hour in milliseconds
  }

  static isTokenBlacklisted(token: string): boolean {
    return this.blacklist.has(token);
  }

  // Optional: Clear all tokens (useful for testing)
  static clearAll() {
    this.blacklist.clear();
  }
}

export default TokenBlacklist;
