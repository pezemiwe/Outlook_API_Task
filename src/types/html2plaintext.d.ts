declare module 'html2plaintext' {
    export default function html2plaintext(
      html: string,
      options?: {
        ignoreHref?: boolean;
        ignoreImage?: boolean;
        ignoreClass?: string;
        separator?: string;
        wordRegex?: RegExp;
      }
    ): string;
  }
  