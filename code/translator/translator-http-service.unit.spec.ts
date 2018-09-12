import { TestBed } from "@angular/core/testing";

import { TranslatorHttpService } from "./translator-http.service";
import { ApiHttpService } from "../api/api.http.service";
import { ApiHttpServiceStub } from "../tests.fixtures";

describe("TranslatorHttpService", () => {
  let service: TranslatorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiHttpService,
          useClass: ApiHttpServiceStub
        }
      ]
    });
    service = TestBed.get(TranslatorHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
