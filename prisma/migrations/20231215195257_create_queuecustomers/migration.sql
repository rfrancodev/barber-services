-- CreateTable
CREATE TABLE "queuecustomers" (
    "id" SERIAL NOT NULL,
    "queueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "isAwaiting" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "queuecustomers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "queuecustomers" ADD CONSTRAINT "queuecustomers_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
