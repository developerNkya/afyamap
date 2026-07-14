<?php

namespace App\Libraries;

/**
 * ============================================================
 * GOOGLE AUTHENTICATOR (TOTP - RFC 6238)
 * ============================================================
 * Self-contained: no composer package required.
 * Works with Google Authenticator, Microsoft Authenticator,
 * Authy, FreeOTP, etc.
 */
class GoogleAuthenticator
{
    protected int $codeLength = 6;
    protected int $period     = 30; // seconds per code

    protected const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    // ================= CREATE SECRET =================
    public function createSecret(int $length = 16): string
    {
        $secret = '';
        for ($i = 0; $i < $length; $i++) {
            $secret .= self::BASE32_CHARS[random_int(0, 31)];
        }
        return $secret;
    }

    // ================= CURRENT CODE =================
    public function getCode(string $secret, ?int $timeSlice = null): string
    {
        if ($timeSlice === null) {
            $timeSlice = (int) floor(time() / $this->period);
        }

        $secretKey = $this->base32Decode($secret);

        // Pack time into binary (big endian, 8 bytes)
        $time = str_pad(pack('N', $timeSlice), 8, "\0", STR_PAD_LEFT);

        $hash = hash_hmac('sha1', $time, $secretKey, true);

        // Dynamic truncation
        $offset = ord(substr($hash, -1)) & 0x0F;
        $part   = substr($hash, $offset, 4);

        $value  = unpack('N', $part)[1] & 0x7FFFFFFF;
        $modulo = 10 ** $this->codeLength;

        return str_pad((string) ($value % $modulo), $this->codeLength, '0', STR_PAD_LEFT);
    }

    // ================= VERIFY CODE =================
    /**
     * $window = how many 30s steps of clock drift to allow (1 = ±30 sec)
     */
    public function verifyCode(string $secret, string $code, int $window = 1): bool
    {
        $code = preg_replace('/\s+/', '', $code);

        if (strlen($code) !== $this->codeLength || !ctype_digit($code)) {
            return false;
        }

        $currentSlice = (int) floor(time() / $this->period);

        for ($i = -$window; $i <= $window; $i++) {
            $calculated = $this->getCode($secret, $currentSlice + $i);
            if (hash_equals($calculated, $code)) {
                return true;
            }
        }

        return false;
    }

    // ================= OTPAUTH URI (FOR QR CODE) =================
    public function getQrUri(string $accountName, string $secret, string $issuer = 'AfyaMap'): string
    {
        return 'otpauth://totp/'
            . rawurlencode($issuer) . ':' . rawurlencode($accountName)
            . '?secret=' . $secret
            . '&issuer=' . rawurlencode($issuer)
            . '&algorithm=SHA1&digits=6&period=30';
    }

    // ================= BASE32 DECODE =================
    protected function base32Decode(string $secret): string
    {
        $secret = strtoupper(str_replace('=', '', $secret));
        $binary = '';

        foreach (str_split($secret) as $char) {
            $pos = strpos(self::BASE32_CHARS, $char);
            if ($pos === false) {
                continue;
            }
            $binary .= str_pad(decbin($pos), 5, '0', STR_PAD_LEFT);
        }

        $decoded = '';
        foreach (str_split($binary, 8) as $byte) {
            if (strlen($byte) === 8) {
                $decoded .= chr(bindec($byte));
            }
        }

        return $decoded;
    }
}
