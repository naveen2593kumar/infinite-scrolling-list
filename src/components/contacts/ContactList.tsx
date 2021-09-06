import { useCallback, useEffect, useRef, useState } from "react";

import { IContact } from "../../model/contact.interface";
import { fetchContacts } from "../../services/ContactService";
import ContactCard from "./ContactCard";
import ContactSkeleton from "./ContactSkeleton";

const ContactList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [finished, setFinished] = useState(false);
  let observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback((node) => {
    if (observer.current) {
      observer?.current?.disconnect();
    }

    observer.current = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting) {
        if (!finished) {
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [contacts]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true);
    fetchContacts(pageNumber * 20)
      .then((list) => {
        if (list.length > 0) {
          setContacts([...contacts, ...list]);
        } else {
          setFinished(true);
        }

      }).finally(() => {
        setLoading(false);
      });
  }, [pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {contacts.map((contact, idx) => {
        if (idx === contacts.length - 1) {
          return <div ref={lastItemRef} key={`${contact.name}-${contact.picture}`}>
            <ContactCard contact={contact} />
          </div>;
        } else {
          return <div key={`${contact.name}-${contact.picture}`}>
            <ContactCard contact={contact} />
          </div>;
        }
      })}
      {loading && <ContactSkeleton />}
    </div>
  );
}
export default ContactList;