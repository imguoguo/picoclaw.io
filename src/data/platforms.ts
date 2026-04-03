// Platform download data — shared source of truth

export interface Arch {
  label: string;
  desc: string;
  file: string;
  fileIntl?: string;
  repo?: string;
  packages?: { deb: string; rpm: string };
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  archs?: Arch[];
  link?: string;
  sub?: Record<string, string>;
}

export const PLATFORMS: Platform[] = [
  { id: 'macos', name: 'macOS', icon: 'apple', color: '#b0b0b5', archs: [
    { label: 'Apple Silicon (arm64)', desc: 'M1 / M2 / M3 and later', file: 'picoclaw_Darwin_arm64.tar.gz' },
    { label: 'Intel (x86_64)', desc: 'Intel-based Mac', file: 'picoclaw_Darwin_x86_64.tar.gz' },
  ]},
  { id: 'windows', name: 'Windows', icon: 'windows', color: '#0a84ff', archs: [
    { label: 'x86_64 (64-bit)', desc: 'Recommended for most PCs', file: 'picoclaw_Windows_x86_64.zip' },
    { label: 'ARM64', desc: 'Windows on ARM', file: 'picoclaw_Windows_arm64.zip' },
  ]},
  { id: 'linux', name: 'Linux', icon: 'linux', color: '#f5a623', archs: [
    { label: 'x86_64', desc: '64-bit \u00b7 Recommended', file: 'picoclaw_Linux_x86_64.tar.gz', packages: { deb: 'picoclaw_x86_64.deb', rpm: 'picoclaw_x86_64.rpm' } },
    { label: 'ARM64 (arm64)', desc: 'Raspberry Pi 4/5, modern SBCs', file: 'picoclaw_Linux_arm64.tar.gz', packages: { deb: 'picoclaw_aarch64.deb', rpm: 'picoclaw_aarch64.rpm' } },
    { label: 'ARMv7 (armv7)', desc: 'Raspberry Pi 2/3, older SBCs', file: 'picoclaw_Linux_armv7.tar.gz', packages: { deb: 'picoclaw_armv7.deb', rpm: 'picoclaw_armv7.rpm' } },
    { label: 'ARMv6 (armv6)', desc: 'Raspberry Pi 1 / Zero', file: 'picoclaw_Linux_armv6.tar.gz', packages: { deb: 'picoclaw_armv6.deb', rpm: 'picoclaw_armv6.rpm' } },
    { label: 'RISC-V 64 (riscv64)', desc: 'RISC-V 64-bit', file: 'picoclaw_Linux_riscv64.tar.gz', packages: { deb: 'picoclaw_riscv64.deb', rpm: 'picoclaw_riscv64.rpm' } },
    { label: 'MIPS (mipsle)', desc: 'MIPS little-endian 32-bit', file: 'picoclaw_Linux_mipsle.tar.gz', packages: { deb: 'picoclaw_mipsle.deb', rpm: 'picoclaw_mipsle.rpm' } },
    { label: 's390x', desc: 'IBM Z / LinuxONE', file: 'picoclaw_Linux_s390x.tar.gz', packages: { deb: 'picoclaw_s390x.deb', rpm: 'picoclaw_s390x.rpm' } },
  ]},
  { id: 'freebsd', name: 'FreeBSD', icon: 'freebsd', color: '#d03030', archs: [
    { label: 'x86_64', desc: '64-bit \u00b7 Recommended', file: 'picoclaw_Freebsd_x86_64.tar.gz' },
    { label: 'ARM64 (arm64)', desc: 'AArch64', file: 'picoclaw_Freebsd_arm64.tar.gz' },
    { label: 'ARMv7 (armv7)', desc: 'ARM 32-bit', file: 'picoclaw_Freebsd_armv7.tar.gz' },
  ]},
  { id: 'netbsd', name: 'NetBSD', icon: 'netbsd', color: '#FF6600', archs: [
    { label: 'x86_64', desc: '64-bit \u00b7 Recommended', file: 'picoclaw_Netbsd_x86_64.tar.gz' },
    { label: 'ARM64 (arm64)', desc: 'AArch64', file: 'picoclaw_Netbsd_arm64.tar.gz' },
  ]},
  { id: 'android', name: 'Android', icon: 'android', color: '#3ddc84',
    archs: [
      { label: 'Android APK', desc: 'PicoClaw FUI',
        file: 'picoclaw_fui-android-universal.apk',
        fileIntl: 'picoclaw_fui-android-international-universal.apk',
        repo: 'picoclaw_fui' },
    ],
  },
  { id: 'docker', name: 'Docker', icon: 'docker', color: '#2496ed',
    link: 'https://docs.picoclaw.io/docs/docker',
    sub: { en: 'View Guide', zh: '\u67e5\u770b\u6559\u7a0b' },
  },
];
