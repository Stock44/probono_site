-- CreateTable
CREATE TABLE "UserReauthentication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReauthentication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserReauthentication" ADD CONSTRAINT "UserReauthentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
