import json

import decimal
from zeep.helpers import serialize_object


def serializar(object):
    object_ser = serialize_object(object)
    object_ser = object_ser['Paises']['PaisEntity']
    # del object_ser['TimeStamp']
    return json.dumps(object_ser)


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)