"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
import { Accordion } from "react-bootstrap";

export interface FilterItem {
  id: string;
  name: string;
}
export default function Filter({ items }: { items: FilterItem[] }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
    } else {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("collection_ids", selectedItems.join(","));

      // cast to string
      const search = current.toString();
      const query = search ? `?${search}` : "";

      startTransition(() => {
        replace(`${pathname}${query}`);
      });
    }
  }, [selectedItems]);

  function handleFilter(checked: boolean, itemId: string) {
    const index = selectedItems.findIndex((id) => id === itemId);
    if (checked) {
      if (index == -1) {
        setSelectedItems([...selectedItems, itemId]);
      }
    } else {
      if (index > -1) {
        selectedItems.splice(index, 1);
        setSelectedItems([...selectedItems]);
      }
    }
  }

  return (
    <div id="side-bar" className="side-bar style-3">
      <div className="widget widget-category mgbt-24 boder-bt">
        <div className="content-wg-category">
          <Accordion defaultActiveKey={"0"}>
            <Accordion.Item eventKey={`0`}>
              <Accordion.Header>Event</Accordion.Header>
              <Accordion.Body>
                <form action="#">
                  {items.map((item, index) => (
                    <div key={index}>
                      <label>
                        {item.name}
                        <input
                          type="checkbox"
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            handleFilter(event.target.checked, item.id);
                          }}
                        />
                        <span className="btn-checkbox"></span>
                      </label>
                      <br />
                    </div>
                  ))}
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
