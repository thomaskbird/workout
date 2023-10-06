# if this is the staging deployment environment
if test "$APP_ENV" = "staging"
  then
    # removing the .env.production file
    # because otherwise next would use it
    # as the default .env file
   rm -f ./.env.production.local

    # renaming ".env.staging" to ".env.local" so that
    # next will use it as .env file
    cp ./.env.staging ./.env.production.local

    # for dev and stage turn off web crawling
    echo $'User-agent: * \nDisallow: /' > ./public/robots.txt
  fi

if test "$APP_ENV" = "development"
  then
    # removing the .env.production file
    # because otherwise next would use it
    # as the default .env file
   rm -f ./.env.production.local

    # renaming ".env.staging" to ".env.local" so that
    # next will use it as .env file
    cp ./.env.development ./.env.production.local

    # for dev and stage turn off web crawling
    echo $'User-agent: * \nDisallow: /' > ./public/robots.txt
  fi

# building the Next.js application
next build
