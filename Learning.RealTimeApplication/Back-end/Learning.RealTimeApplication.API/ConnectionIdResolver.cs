using System.Collections;

namespace Learning.RealTimeApplication.API
{
    public class ConnectionIdResolver
    {
        // Dans un sc�nario de production, ces informations devraient-�tre stock�es dans une base de donn�es.
        private Hashtable _usernameToConnectionId = new Hashtable();

        public string Resolve(string username) =>
            _usernameToConnectionId.ContainsKey(username) ? (string) _usernameToConnectionId[username] : null;

        public void UpdateConnectionIdMapping(string username, string connectionId) =>
            _usernameToConnectionId.Add(username, connectionId);
    }
}