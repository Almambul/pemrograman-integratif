import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='test_queue')

channel.basic_publish(exchange='', routing_key='test_queue', body='Halo, ini implementasi pengiriman message menggunakan rabbitmq')
print(" [x] Sent Message")

connection.close()
