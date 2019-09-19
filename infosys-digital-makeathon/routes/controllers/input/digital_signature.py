
import os
import sys
import requests
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15

class digital_signature:

    def generate_keys(self, citizenID):
        
        key = RSA.generate(1024)
        try:
            os.chdir(r"./routes/controllers/input/") 
            os.makedirs("../../../keys/"+citizenID)
        except FileExistsError:
            # directory already exists
            pass
        
        try:
            f = open("../../../keys/"+citizenID+'/key.pem', 'wb')
            f.write(key.exportKey(format='PEM',protection="scryptAndAES128-CBC",passphrase='secret_code'))
            f.close()

            f = open("../../../keys/"+citizenID+'/publicKey.pem', 'wb')
            f.write(key.exportKey(format='PEM',protection="scryptAndAES128-CBC",passphrase='secret_code'))
            f.close()

            return True
        except Exception as err:
            print(err)
            return err
        
    def sign_problem(self, problem_id, citizenID):
        
        message = problem_id
        hashObj = SHA256.new(message)

        try:
            os.chdir(r"./routes/controllers/input/") 
            f = open('../../../keys/'+citizenID+'/key.pem', 'rb')
            key = RSA.importKey(f.read(),passphrase='secret_code')
            f.close()
            signature = pkcs1_15.new(key).sign(hashObj)
            return signature
        except Exception as error:
            return (error)
        
if __name__ == '__main__':

    problemID = sys.argv[1]
    citizenID = sys.argv[2]
    purpose = sys.argv[3]

    obj = digital_signature()
    
    if purpose == 'generate_keys':
        print(obj.generate_keys(citizenID))
    elif purpose == 'digitally_sign_problem':
        print((obj.sign_problem(problemID.encode('utf-8'), citizenID)))
    else:
        print(False)