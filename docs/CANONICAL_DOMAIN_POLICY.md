# Hands Gifted Canonical Domain Policy

## Canonical public website

The official public website address for Hands Gifted Foundation is:

**https://handsgiftedfoundation.com**

This domain is the website address for the Hands Gifted Foundation web application. It must not be presented as a domain-for-sale listing, marketplace listing, parking page, or alternate product.

## Hosting and deployment

Vercel is deployment and hosting infrastructure only. `*.vercel.app` URLs are internal technical addresses for previews, deployment verification, troubleshooting, and rollback. They are not the public website address and should not be presented to users as the Hands Gifted website.

## Release verification rule

A release is not considered fully verified for the public website until:

1. the canonical GitHub `main` build succeeds;
2. the production Vercel deployment is healthy;
3. the release is reachable through `https://handsgiftedfoundation.com`;
4. canonical metadata continues to point to `https://handsgiftedfoundation.com`;
5. private Command Center, Family Dashboard, and Family Academy records remain protected by authentication/RLS.

## Product surfaces

- Public Foundation website: `https://handsgiftedfoundation.com`
- Command Center: private application surface under the canonical domain
- Family Dashboard: private family surface under the canonical domain
- Family Academy: public explanation plus authenticated private learning surfaces under the canonical domain
- Vercel deployment URLs: infrastructure/testing only
